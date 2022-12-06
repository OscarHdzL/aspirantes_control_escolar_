import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VexModule } from '../@vex/vex.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomLayoutModule } from './custom-layout/custom-layout.module';
import { ToastrModule } from 'ngx-toastr';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { VisorComponent } from './visor/visor.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { JwtModule, JwtConfig, JwtHelperService } from '@auth0/angular-jwt';
import { LoaderInterceptor } from './loader.interceptor';
import { LoaderComponent } from './loader/loader.component';
import { NgxLoadingModule } from 'ngx-loading';


export function tokenGetter() {
  var a = localStorage.getItem("access_token");
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [AppComponent, LoaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(), // ToastrModule added
    // Vex
    VexModule,
    CustomLayoutModule,
    PdfViewerModule,
    NgxLoadingModule.forRoot({}),
    JwtModule.forRoot({
      config: {

tokenGetter: () => {
/*   const helper = new JwtHelperService();

  var time = helper.getTokenExpirationDate(localStorage.getItem("access_token"))
  var expira = helper.isTokenExpired(localStorage.getItem("access_token"));
  var decode = helper.decodeToken(localStorage.getItem("access_token")); */

  return localStorage.getItem("access_token");
},
        ///IP O DIRECCION DE LOS SERVICIOS A LOS QUE SE VA ENVIAR LA PETICION, ES IMPORTANTE AGREGARLA, DE LO CONTRARIO, NO ENVIA EL TOKEN
        whitelistedDomains: ["localhost:7243"],
        /* blacklistedRoutes: ["http://example.com/examplebadroute/"], */
      },
    })
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-MX' }, {
    provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

