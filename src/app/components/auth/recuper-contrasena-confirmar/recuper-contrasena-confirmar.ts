import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recuper-contrasena-confirmar',
  imports: [FormsModule],
  templateUrl: './recuper-contrasena-confirmar.html',
  styleUrl: './recuper-contrasena-confirmar.css',
})
export class RecuperContrasenaConfirmar {
  // Arreglo estructural para renderizar los 6 casilleros con @for
  otpBoxes = new Array(6);
  
  // Modelo para almacenar cada caracter del código de verificación
  otpValues: string[] = ['', '', '', '', '', ''];
  
  private location = inject(Location);
  /**
   * Controla el comportamiento automático cuando el usuario digita un valor
   */
  onInputFocus(event: any, index: number): void {
    const inputTarget = event.target;
    
    // Si escribió un carácter y no es el último casillero, avanza el foco
    if (inputTarget.value.length === 1 && index < this.otpBoxes.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  /**
   * Controla el borrado para regresar el foco de forma intuitiva
   */
  onKeyDownFocus(event: KeyboardEvent, index: number): void {
    // Si presiona borrar y el casillero está vacío, retrocede al anterior
    if (event.key === 'Backspace' && !this.otpValues[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
    }
  }

  /**
   * Evalúa si los 6 casilleros han sido rellenados
   */
  isOtpComplete(): boolean {
    return this.otpValues.every(val => val !== undefined && val.trim() !== '');
  }

  /**
   * Ejecuta la lógica para comprobar el código ingresado
   */
  onVerify(): void {
    if (this.isOtpComplete()) {
      const fullCode = this.otpValues.join('');
      console.log('Código OTP armado listo para validar:', fullCode);
      // Aquí amarras tu servicio HTTP para consumir tu API (ej. AuthService.verifyOtp(fullCode))
    }
  }

  /**
   * Petición para solicitar un nuevo reenvío del token
   */
  onResendCode(event: Event): void {
    event.preventDefault();
    console.log('Solicitando reenvío de código al servidor...');
  }

  /**
   * Redirección manual hacia atrás
   */
  goBack(event: Event): void {
    this.location.back();
    console.log('Regresando a la pantalla anterior...');
  }
}
