import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

export class ViewportSizeDetector {
    constructor(private breakpointObserver: BreakpointObserver) { }

    screenLarge = false;
    screenXSmall = false;
    screenSmall = false;
    screenMedium = false;
    screenXLarge = false;

    defineScreenSize() {
        this.screenLarge = false;
        this.screenXSmall = false;
        this.screenSmall = false;
        this.screenMedium = false;
        this.screenXLarge = false;

        this.breakpointObserver
            .observe([Breakpoints.Large])
            .subscribe(result => {
                if (result.matches)
                    this.screenLarge = true;
            });

        this.breakpointObserver
            .observe([Breakpoints.XSmall])
            .subscribe(result => {
                if (result.matches)
                    this.screenXSmall = true;
            });

        this.breakpointObserver
            .observe([Breakpoints.Small])
            .subscribe(result => {
                if (result.matches)
                    this.screenSmall = true;
            });

        this.breakpointObserver
            .observe([Breakpoints.Medium])
            .subscribe(result => {
                if (result.matches)
                    this.screenMedium = true;
            });

        this.breakpointObserver
            .observe([Breakpoints.XLarge])
            .subscribe(result => {
                if (result.matches)
                    this.screenXLarge = true;
            });
    }
}