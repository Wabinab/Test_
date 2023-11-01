import { Injectable, Output, EventEmitter } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { AuthService } from '../auth.service';
//import { AppConfigService } from './app-config.service';

@Injectable()
export class SocketService {

  private _connection: HubConnection;
  @Output() eventEmit = new EventEmitter<any>();
  baseUrl = '/';

  constructor(authService: AuthService) {

    const url = this.baseUrl + 'actHub';

    console.log('WebsocketService: ' + url);
    // create Connection
    this._connection = new HubConnectionBuilder().withUrl(url, {accessTokenFactory: ()=>authService.accessToken}).build();

    this._connection.on('Tlib.Actlog', (dtime, data) => {
      this.eventEmit.emit({ ty:'Tlib.Actlog', dtime: dtime, data: data });
    });

    this._connection.onclose(() => {
      this.eventEmit.emit({ ty: 'Connection', status: -1 }); //-closed
      this.start();
    })

    this.start();
  }


  start() {
    // start connection
    this._connection
      .start()
      .then(() => {
        console.log('Websocket Connection started!');
        this.eventEmit.emit({ ty: 'Connection', status: 1 }); //-connected
      })
      .catch(err => { console.error(err, 'red'); setTimeout(() => this.start(), 5000) });
  }

}

