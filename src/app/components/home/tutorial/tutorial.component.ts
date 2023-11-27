import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoService } from "../../../services/video.service";
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule


@Component({
  selector: 'app-tutorial',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {

  spinner: boolean = true;
  photos: any[] = [];

  constructor(private videoService: VideoService) {}
  ngOnInit() {

    setTimeout(() => {
      this.videoService.getVideos('dogs').subscribe({
        next: (data) => {
          this.spinner = false;
          this.photos = data.photos;
        },
        error: (error) => {
          this.spinner = false;
          console.error('There was an error!', error);
        }
      });
    }, 2000); // 2000 milliseconds delay
  }
}
