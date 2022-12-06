import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { PaginasRoutingModule } from './paginas-routing.module';
import { CuestionarioConvocatoriaComponent } from './cuestionario-convocatoria/cuestionario-convocatoria.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CargaDocumentosAspiranteComponent } from './carga-documentos-aspirante/carga-documentos-aspirante.component';
import { NgxMaskModule } from 'ngx-mask-2';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { ValidacionDocumentoComponent } from './carga-documentos-aspirante/validacion-documento/validacion-documento.component';
import { MatDialogModule } from '@angular/material/dialog';
import {SliderModule} from 'primeng/slider';
import {TimelineModule} from 'primeng/timeline';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip';
import { EstatusEscalafonComponent } from './estatus-escalafon/estatus-escalafon.component';


@NgModule({
  declarations: [
    InicioComponent,
    CuestionarioConvocatoriaComponent,
    CargaDocumentosAspiranteComponent,
    ValidacionDocumentoComponent,
    EstatusEscalafonComponent
  ],
  imports: [
    CommonModule,
    PaginasRoutingModule,
    CommonModule,
    FormsModule,
    PageLayoutModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatSliderModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    SecondaryToolbarModule,
    BreadcrumbsModule,
    CurrencyMaskModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatTooltipModule,
    MatSidenavModule,
    MatPaginatorModule,
    PdfViewerModule,
    MatToolbarModule,
    MatDialogModule,
    NgxMaskModule.forRoot(),

    RecaptchaModule,
    RecaptchaFormsModule,

    MaterialFileInputModule,
    SliderModule,
    TimelineModule,
    CardModule,
    ButtonModule,
    TooltipModule

  ]
})
export class PaginasModule { }
