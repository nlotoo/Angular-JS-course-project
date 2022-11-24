import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainServiceService } from 'src/app/services/main-service.service';
import { environment } from 'src/environments/environment.prod';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent implements OnInit {

  item: any
  authorBoolean: boolean = false

  isLoged: string | null = localStorage.getItem('Session Token')



  constructor(
    private route: ActivatedRoute,
    private ServiceComponent: ProfileService,
    private HttpClient: HttpClient,

  ) {

  }
  locastorageID = localStorage.getItem('User ID')
  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.ServiceComponent.getOneItem(data['id']).subscribe((itemById) => {
        this.item = itemById

        this.authorBoolean = this.item.author == this.locastorageID
      })

    })

  }



  likeItem(): void {
    let data = {
      itemID: this.item._id,
      logedUserID: this.locastorageID,
    }

    this.ServiceComponent.likeButtonPress(data).subscribe(
      {
        next: () => {
          console.log('Sucssefull request')
          window.location.reload();
        },
        error: (err) => {
          console.log(`Server error: ${err.error.message}`)
        }
      }
    )


  }

  disLikeItem(): void {
    let data = {
      itemID: this.item._id,
      logedUserID: this.locastorageID,
    }

    this.ServiceComponent.disLikeButtonPress(data).subscribe(
      {
        next: () => {
          console.log('Sucssefull request')
          // window.location.reload();
        },
        error: (err) => {
          console.log(`Server error: ${err}`)
        }
      }
    )


  }

  deleteItem() {
    let id = this.item._id
    return this.ServiceComponent.deleteOne(id)
  }

}
