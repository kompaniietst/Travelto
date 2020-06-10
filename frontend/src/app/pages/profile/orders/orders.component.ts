import { Component, OnInit } from '@angular/core';
// import { BookingService } from 'src/app/core/services/booking.service';
// import { Room } from 'src/app/shared/models/Room/Room';
// import { RoomDataService } from 'src/app/core/services/room-data.service';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
// import * as moment from 'moment';
// import { Reserved } from 'src/app/shared/models/form/Reserved';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

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

  ngOnInit(): void {
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

//   generateReservedObj(room): Reserved {
//     var obj = this.bookings.find(b => room.id == b.roomId)

//     var nightCount = moment(obj.date.checkout).diff(moment(obj.date.checkin), 'days');

//     return new Reserved(
//       room.id,
//       room.name,
//       room.hotel_name,
//       room.stars,
//       room.imgs,
//       room.price,
//       room.hotel_address,
//       obj.state,
//       obj.date,
//       obj.pex,
//       nightCount
//     )
//   }
  
//   cancel(id: number) {
//     this.loading = true;
//     this.calceledRoomId = id;

//     this.bookingService.changeStatus(id)
//       .subscribe(x => this.loading = false)
//   }
//   trackById(index, item) {
//     return item.id;
//   }
}
