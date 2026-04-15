import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@/app/core/i18n/translate.pipe';
import emailjs from '@emailjs/browser';
import { environment } from '@/environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private cdr = inject(ChangeDetectorRef);

  formData = { name: '', email: '', subject: '', message: '' };

  loading = false;
  successMessage = '';
  errorMessage = '';

  private withTimeout<T>(p: Promise<T>, ms = 12000): Promise<T> {
    return Promise.race([
      p,
      new Promise<T>((_, reject) =>
        setTimeout(() => reject(new Error('TIMEOUT_EMAILJS')), ms)
      ),
    ]);
  }

  async onSubmit() {
    if (this.loading) return;

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';
    this.cdr.markForCheck();

    try {
      const sendPromise = emailjs.send(
        environment.emailjs.serviceId,
        environment.emailjs.templateId,
        {
          from_name: this.formData.name,
          reply_to: this.formData.email,
          subject: this.formData.subject,
          message: this.formData.message,
        },
        { publicKey: environment.emailjs.publicKey }
      );

      await this.withTimeout(sendPromise, 12000);

      this.formData = { name: '', email: '', subject: '', message: '' };
      this.successMessage = 'Mensaje enviado correctamente. Te responderé pronto.';
      this.cdr.markForCheck();

      setTimeout(() => {
        this.successMessage = '';
        this.cdr.markForCheck();
      }, 7000);

    } catch (err: any) {
      console.error('EmailJS error:', err);

      this.errorMessage =
        err?.message === 'TIMEOUT_EMAILJS'
          ? 'No se pudo enviar (timeout). Revisa tu conexión o inténtalo de nuevo.'
          : 'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.';

      this.cdr.markForCheck();

      setTimeout(() => {
        this.errorMessage = '';
        this.cdr.markForCheck();
      }, 5000);

    } finally {
      this.loading = false;
      this.cdr.markForCheck();
    }
  }
}
