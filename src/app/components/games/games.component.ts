import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {ApiServicesService} from 'src/app/api-services.service'
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  uid : string;
  gamesList : any;
  game_id  : string;
  username : string;
  gamesForm:any;
  closeResult = '';

  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private apiServicesService: ApiServicesService,
  ) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('name')
    this.gamesForm = this._fb.group({
      name: ['', Validators.required],
      score: ['', Validators.required]
    });
    this.getGames()
  }
  getGames = ()=>{
    this.uid = localStorage.getItem('uid');
    this.apiServicesService.get('games', {"filters":{"uid":this.uid}}).subscribe(gameDetails =>{
      if(gameDetails.code == 200){
        // this.apiServicesService.successToast(gameDetails.message);
         this.gamesList = gameDetails.game;
      }else{
        this.apiServicesService.errorToast(gameDetails.message)
      }
    },err => {
      console.log(err.error.message)
      this.apiServicesService.errorToast(err.error.message);
    })
  }

  saveGame = ()=>{
    if(this.gamesForm){
      let insertObject = {
        "name":this.gamesForm.value.name,
        "score":this.gamesForm.value.score,
        "uid":localStorage.getItem('uid')
      }
      this.apiServicesService.post('games', {}, insertObject).subscribe(insertResponse =>{
        if(insertResponse.code == 200){
          this.apiServicesService.successToast(insertResponse.message)
          this.getGames()
        }else{
          this.apiServicesService.errorToast(insertResponse.message)
          this.getGames()
        }
      },err => {
        console.log(err.error.message)
        this.apiServicesService.errorToast(err.error.message);
      })
    }
  }

  buildUpdateGameForm = (game)=>{
    this.gamesForm = this._fb.group({
      name: [null, [Validators.required]],
      score: [null, Validators.required]
    });
  }

  updateSelectedGame = (game)=>{
    this.buildUpdateGameForm(game);
    this.game_id = game._id;
    this.gamesForm.patchValue({
      name : game.name, 
      score : game.score
    })
  }

  updateGame = (game_id)=>{
    let updateObject = {"name":this.gamesForm.value.name, "score":this.gamesForm.value.score, "uid":localStorage.getItem('uid')}
    this.apiServicesService.put(`games/${game_id}`, {}, updateObject).subscribe(updatedResponse =>{
      if(updatedResponse.code == 200){
        this.apiServicesService.successToast(updatedResponse.message)
        this.getGames()
      }else{
        this.apiServicesService.errorToast(updatedResponse.message)
        this.getGames()
      }
    })
  }
  
  deleteGame = (game_id)=>{
    if (confirm('Are you sure you want to delete this entry?')) {
      this.apiServicesService.delete(`games/${game_id}`,{}).subscribe(deletedResponse =>{
        if(deletedResponse.code == 200){
          this.apiServicesService.successToast(deletedResponse.message)
          this.getGames()
        }else{
          this.apiServicesService.errorToast(deletedResponse.message)
          this.getGames()
        }
      },err => {
        console.log(err.error.message)
        this.apiServicesService.errorToast(err.error.message);
      })
    }
  }

  logout = ()=>{
    this.apiServicesService.put('user/signOut', {},{"uid":localStorage.getItem('uid')} ).subscribe(signOutResponse=>{
      localStorage.removeItem('uid')
      localStorage.removeItem('name')
      this.router.navigate(['/signin'])
    },err => {
      console.log(err.error.message)
      this.apiServicesService.errorToast(err.error.message);
    })
  }
}
