import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { PreregistroAspiranteService } from 'src/app/servicios/preregistro-aspirante.service';
import { VariablesService } from 'src/app/servicios/variableGL.service';

@Component({
  selector: 'vex-inicio-sesion-aspirante',
  templateUrl: './inicio-sesion-aspirante.component.html',
  styleUrls: ['./inicio-sesion-aspirante.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUp400ms
  ]
})
export class InicioSesionAspiranteComponent implements OnInit {
/*
  form: UntypedFormGroup; */
  FormularioSesion: FormGroup;

  inputType = 'password';
  visible = false;

  constructor(private router: Router,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private snackbar: MatSnackBar,
              private servicioAuth: AutenticacionService,
              private preregistroAspiranteService: PreregistroAspiranteService,
              private toastService: VariablesService,
  ) {

    /* this.FormularioNacionalidad = this.fb.group({
      deporte: [null, Validators.required],
      nacionalidad: [null, Validators.required],
      curp: [null, [Validators.required, Validators.minLength(18), Validators.maxLength(18)]],
      tipodocumentonacionalidad: [null],
      documentodigital: [null]
    }); */

    this.FormularioSesion = this.fb.group({
      usuario: [null, Validators.required],
      contrasena: [null, Validators.required]
    });



  }

  ngOnInit() {
   /*  this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    }); */
  }

  public async send() {
    //this.router.navigate(['/sesion-aspirante']);

    /* this.router.navigate(['/paginas/cuestionario-convocatoria']); */

  var usua = this.FormularioSesion.get('usuario').value
  var pass = this.FormularioSesion.get('contrasena').value

    let objAuth = {
      usuario: usua,
      password: pass
    }

    //DESCOMENTAR SI NO SE USA EL JWT
     const respuestaAuth = await this.preregistroAspiranteService.loginAspirante(objAuth);

    if(respuestaAuth.exito){
      this.toastService.toastSuccess(respuestaAuth.mensaje);

      localStorage.setItem("aspirante", respuestaAuth.objeto);
      this.router.navigate(['/paginas/inicio']);
     } else {
      this.toastService.toastErr(respuestaAuth.mensaje);
     }



    /* DESCOMENTAR ESTE CODIGO PARA SOLICITAR TOKEN JWT */
    /* let objAuth = {
      UserName: usua,
      Password: pass
    }

    const respuesta = await this.servicioAuth.ObtenerToken(objAuth);

    if(respuesta.autentication.exito){

      localStorage.setItem("aspirante", respuesta.autentication.objeto.dataUser);
      localStorage.setItem("access_token", respuesta.autentication.objeto.token);
      this.router.navigate(['/paginas/inicio']);
    }else {
      this.toastService.toastErr("Acceso no autorizado");
     } */
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}
