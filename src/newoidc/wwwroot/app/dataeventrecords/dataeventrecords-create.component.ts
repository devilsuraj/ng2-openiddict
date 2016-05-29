import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { SecurityService } from '../services/SecurityService';

import { DataEventRecordsService } from '../dataeventrecords/DataEventRecordsService';
import { DataEventRecord } from './models/DataEventRecord';

@Component({
    selector: 'dataeventrecords-create',
    templateUrl: 'app/dataeventrecords/dataeventrecords-create.component.html',
    directives: [CORE_DIRECTIVES]
})

export class DataEventRecordsCreateComponent implements OnInit {

    public message: string;
    public DataEventRecord: any;

    constructor(private _dataEventRecordsService: DataEventRecordsService, public securityService: SecurityService, private _router: Router) {
        this.message = "DataEventRecords Create";
    }
    
    ngOnInit() {
        this.DataEventRecord = { Id: 0, Name: "", Description: "" };
        console.log("IsAuthorized:" + this.securityService.IsAuthorized);
        console.log("HasAdminRole:" + this.securityService.HasAdminRole);
    }

    public Create() {
        this._dataEventRecordsService
            .Add(this.DataEventRecord)
            .subscribe((data: any) => this.DataEventRecord = data,
            error => this.securityService.HandleError(error),
            () => this._router.navigate(['DataEventRecordsList']));
    }

    
}
