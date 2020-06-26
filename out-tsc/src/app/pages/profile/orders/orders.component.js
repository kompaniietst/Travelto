import { __decorate } from "tslib";
import { Component } from '@angular/core';
// import * as moment from 'moment';
// import { Reserved } from 'src/app/shared/models/form/Reserved';
let OrdersComponent = class OrdersComponent {
    //   rooms: Room[];
    //   bookings;
    //   reservedRooms: Reserved[] = [];
    //   loading = false;
    //   calceledRoomId: number;
    //   constructor(
    //     private bookingService: BookingService,
    //     private roomDataService: RoomDataService) {
    //     // this.bookings = this.bookingService.bookingsValue;
    //     this.roomDataService.getRooms()
    //       .subscribe(rooms => this.rooms = rooms);
    //   }
    //   arrayFrom(number: number) {
    //     return Array.from(Array(number))
    //   }
    ngOnInit() {
        //     // console.log(this.rooms);
        //     this.bookingService.bookings.subscribe(b => {
        //       console.log('b', b);
        //       this.bookings = b;
        //       (this.reservedRooms as Reserved[]) = this.rooms.filter((room: Room) => b.some(b => b.roomId == room.id))
        //         .map((room: Room) => this.generateReservedObj(room))
        //     });
        //     // this.bookings = this.bookingService.bookings;
        //     // console.log('bookings', this.bookings);
        //     // this.rooms = this.rooms.pipe(
        //     //   map(room =>
        //     //     room.filter(r => {
        //     //       // console.log(this.bookings.some(b => b.roomId == r.id));
        //     //       this.bookings.some(b => b.roomId == r.id)
        //     //     }
        //     //     )
        //     //     // .map(_ => {
        //     //     //   console.log('_', _)
        //     //     //   return _.id, _.name, _.imgs,_.hotel_name, _.hotel_address
        //     //     // })
        //     //   ),
        //     //   // map(room => room)
        //     // )
        //     // this.reservedRooms = this.rooms.pipe(
        //     //   map(rooms =>
        //     //     rooms
        //     //       .filter((room: Room) => this.bookings.some(b => b.roomId == room.id))
        //     //       .map((room: Room) => this.generateReservedObj(room))
        //     //   )
        //     // )
        //     // this.reservedRooms.subscribe(x => console.log('!!!', x))
        //     /*     this.reservedRooms = this.rooms.pipe(
        //           map(room => {
        //             console.log('rrr', room)
        //             return room.filter(r => {
        //               this.bookings.forEach(b => {
        //                 if (b.roomId == r.id) {
        //                   return b
        //                 }
        //               }
        //               )
        //             })
        //           }
        //           ),
        //         )
        //         this.reservedRooms.subscribe(x => console.log(x)) */
        //     // this.rooms.pipe(
        //     //   map(x => {
        //     //     console.log('________________', x);
        //     //     return x.map(c => { return { id: c.id, name: c.name } })
        //     //     // return _.id, _.name, _.imgs,_.hotel_name, _.hotel_address
        //     //   })
        //     // ).subscribe(a => console.log('a', a))
        //     // return _.id, _.name, _.imgs,_.hotel_name, _.hotel_address
        //     // }
        //     // )
        //     // this.reservedRooms)
    }
};
OrdersComponent = __decorate([
    Component({
        selector: 'app-orders',
        templateUrl: './orders.component.html',
        styleUrls: ['./orders.component.scss']
    })
], OrdersComponent);
export { OrdersComponent };
//# sourceMappingURL=orders.component.js.map