import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Projekat } from 'src/app/models/projekat';
import {ProjekatService} from 'src/app/services/projekat.service';
import { ProjekatDialogComponent } from '../dialogs/projekat-dialog/projekat-dialog.component';

@Component({
  selector: 'app-projekat',
  templateUrl: './projekat.component.html',
  styleUrls: ['./projekat.component.css']
})
export class ProjekatComponent implements OnInit, OnDestroy {

  constructor(private projekatService : ProjekatService,
    private dialog: MatDialog) { }

  subscription: Subscription;
  displayedColumns = ['id', 'naziv', 'opis', 'oznaka'];
  dataSource: MatTableDataSource<Projekat>;

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); 
  }

  ngOnInit(): void {
  }

  public loadData() {
    this.subscription = this.projekatService.getAllProjekti().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
      }
    ),

    (error: Error) => {
      console.log(error.name+' '+error.message)
    }
  }

  public openDialog(flag: number, id?: number, naziv?:string, opis?:string, oznaka?:string) :void {

    const dialogRef = this.dialog.open (ProjekatDialogComponent, {data: {id,naziv, opis, oznaka}});
    dialogRef.componentInstance.flag = flag; 
    dialogRef.afterClosed().subscribe(res => {
      if(res==1)
      {
        this.loadData(); 
      }
    })
  }



}