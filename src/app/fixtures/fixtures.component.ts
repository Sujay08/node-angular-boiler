import { Component, OnInit } from '@angular/core';
import { ApiService } from "../services/http/api.service";
import { ApiConfiguration } from "../services/http/api-configuration";

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css']
})
export class FixturesComponent implements OnInit {
  showInputs: boolean = true;
  formData: any = {};
  formDataNba: any = {};
  fixtureDetails: any = [];
  fixtureDetailsNba: any = [];
  profileDetails: any = [];
  hideme=[]
  Lfifa: boolean = false;
  Lnba: boolean = true;

  constructor(
    private apiService: ApiService,
    private apiConfig: ApiConfiguration
  ) { }

  ngOnInit(): void {
    this.clickActiveTab();
    this.getFifaFixtureDetails();
    this.getNBAFixtureDetails();
    this.formData.home_score = '';
    this.formData.away_score = '';
  }

  fifaTab(){
    this.Lfifa = false;
    this.Lnba = true;
    localStorage.setItem('activeTab', 'fifa');
  }

  nbaTab(){
    this.Lfifa = true;
    this.Lnba = false;
    localStorage.setItem('activeTab', 'nba');
  }

  clickActiveTab(){
    let activeTab = localStorage.getItem('activeTab')
    if(activeTab == 'fifa'){
      document.getElementById('fifaTab').click();
    } else if(activeTab == 'nba'){
      document.getElementById('nbaTab').click();
    }
  }

  getFifaFixtureDetails() {
    let url = this.apiConfig.baseUrl + this.apiConfig.fixturesFifa;
    this.apiService.get(url)
      .subscribe((res: any) => {
        this.fixtureDetails = res.data;
        this.getProfileDetails();
      }, err => {
        console.log(err);
      })
  }

  getProfileDetails() {
    let url = this.apiConfig.baseUrl + this.apiConfig.allUsers;
    this.apiService.get(url)
      .subscribe((res: any) => {
        this.profileDetails = res.data;
      }, err => {
        console.log(err);
      })
  }

  enterMatchScore(fixture, i) {
    this.formData.fixtures_id = fixture.fixtures_id;
    this.formData.home_user_id = fixture.home_user_id;
    this.formData.away_user_id = fixture.away_user_id;
    if (this.formData.home_score > this.formData.away_score) {
      this.formData.winner_user_id = fixture.home_user_id;
      this.formData.loser_user_id = fixture.away_user_id;
      this.formData.winning_score = this.formData.home_score;
      this.formData.loosing_score = this.formData.away_score;
    } else if (this.formData.home_score < this.formData.away_score) {
      this.formData.winner_user_id = fixture.away_user_id;
      this.formData.loser_user_id = fixture.home_user_id;
      this.formData.winning_score = this.formData.away_score;
      this.formData.loosing_score = this.formData.home_score;
    } else {
      this.formData.winner_user_id = 0;
    }
    let url = this.apiConfig.baseUrl + this.apiConfig.fifaScore;
    this.apiService.post(url, this.formData)
      .subscribe((res: any) => {
        this.hideme[i] = !this.hideme[i];
        this.getFifaFixtureDetails();
        this.formData.home_score = '';
        this.formData.away_score = '';
      }, err => {
        console.log(err);
      })
  }

  enterMatchScoreNba(fixture, i) {
    this.formDataNba.fixtures_id = fixture.fixtures_id;
    this.formDataNba.home_user_id = fixture.home_user_id;
    this.formDataNba.away_user_id = fixture.away_user_id;
    if (this.formDataNba.home_score > this.formDataNba.away_score) {
      this.formDataNba.winner_user_id = fixture.home_user_id;
      this.formDataNba.loser_user_id = fixture.away_user_id;
      this.formDataNba.winning_score = this.formDataNba.home_score;
      this.formDataNba.loosing_score = this.formDataNba.away_score;
    } else if (this.formDataNba.home_score < this.formDataNba.away_score) {
      this.formDataNba.winner_user_id = fixture.away_user_id;
      this.formDataNba.loser_user_id = fixture.home_user_id;
      this.formDataNba.winning_score = this.formDataNba.away_score;
      this.formDataNba.loosing_score = this.formDataNba.home_score;
    }
    let url = this.apiConfig.baseUrl + this.apiConfig.nbaScore;
    this.apiService.post(url, this.formDataNba)
      .subscribe((res: any) => {
        this.hideme[i] = !this.hideme[i];
        this.getNBAFixtureDetails();
        this.formDataNba.home_score = '';
        this.formDataNba.away_score = '';
      }, err => {
        console.log(err);
      })
  }

  ToggleInput(i){
    this.hideme[i] = !this.hideme[i]
    this.formData.home_score = '';
    this.formData.away_score = '';
    this.formDataNba.home_score = '';
    this.formDataNba.away_score = '';
  };

  // NBA

  getNBAFixtureDetails() {
    let url = this.apiConfig.baseUrl + this.apiConfig.fixturesNba;
    this.apiService.get(url)
      .subscribe((res: any) => {
        this.fixtureDetailsNba = res.data;
      }, err => {
        console.log(err);
      })
  }

}
