'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';

interface FormData {
  from_name: string;
  phone: string;
  city: string;
  age: string;
  experience: string;
  position: string;
  message: string;
}

const EMPTY_FORM: FormData = {
  from_name: '',
  phone: '',
  city: '',
  age: '',
  experience: '',
  position: '',
  message: '',
};

export default function FormSection() {
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await emailjs.send(
        'service_f7vn2lp',
        'template_kgsyy0a',
        {
          from_name: form.from_name,
          phone: form.phone,
          city: form.city || '—',
          age: form.age || '—',
          experience: form.experience || '—',
          position: form.position || '—',
          message: form.message || '—',
        },
        '-YXyaClsKBSxhnuD6'
      );
      setSubmitted(true);
      document.getElementById('fs')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (error) {
      console.error('EmailJS error:', JSON.stringify(error));
      alert('Помилка: ' + JSON.stringify(error));
      setSubmitting(false);
    }
  };

  return (
    <section id="form-section">
      <div className="container">
        <div style={{
          background: 'rgba(8,2,2,0.45)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(200,168,75,0.12)',
          padding: '3rem',
        }}>
        <div className="form-grid">
          <div className="form-info">
            <div className="s-label">Запис до бригади</div>
            <h2 className="s-title">Зроби <em>перший крок</em></h2>
            <p>Залиш заявку — наш рекрутер зв&apos;яжеться з тобою, відповість на всі запитання і розкаже про умови служби в 54 ОАБр.</p>
            <p style={{ fontSize: '.85rem', color: 'var(--muted)', marginTop: '1rem', padding: '1rem 1.25rem', background: 'rgba(139,26,26,.1)', borderLeft: '3px solid var(--red-b)' }}>
              Твої дані <strong style={{ color: 'var(--gold)' }}>не передаються ТЦК</strong>. Заявка — це лише початок спілкування з рекрутером.
            </p>
          </div>

          <div>
            {!submitted ? (
              <form id="rf" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Ім&apos;я та прізвище *</label>
                    <input type="text" name="from_name" placeholder="Іван Петренко" required value={form.from_name} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Телефон *</label>
                    <input type="tel" name="phone" placeholder="+38 (0XX) XXX-XX-XX" required value={form.phone} onChange={handleChange} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Місто</label>
                    <input type="text" name="city" placeholder="Київ" value={form.city} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Вік</label>
                    <input type="number" name="age" placeholder="25" min="18" max="60" value={form.age} onChange={handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Досвід</label>
                  <select name="experience" value={form.experience} onChange={handleChange}>
                    <option value="">Оберіть варіант</option>
                    <option value="Є бойовий досвід">Є бойовий досвід</option>
                    <option value="Є військовий досвід (без бойових)">Є військовий досвід (без бойових)</option>
                    <option value="Строкова служба">Строкова служба</option>
                    <option value="Цивільний без досвіду">Цивільний без досвіду</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Бажана позиція</label>
                  <select name="position" value={form.position} onChange={handleChange}>
                    <option value="">Будь-яка підходяща</option>
                    <option value="Навідник">Навідник</option>
                    <option value="Заряджаючий">Заряджаючий</option>
                    <option value="Командир гармати">Командир гармати</option>
                    <option value="Водій-механік">Водій-механік</option>
                    <option value="Оператор БпЛА">Оператор БпЛА</option>
                    <option value="Зв'язківець">Зв&apos;язківець</option>
                    <option value="Медик">Медик</option>
                    <option value="Технік з озброєння">Технік з озброєння</option>
                    <option value="Інше">Інше</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Коментар</label>
                  <textarea name="message" placeholder="Додаткова інформація, запитання..." value={form.message} onChange={handleChange}></textarea>
                </div>
                <button type="submit" className="btn-sub" disabled={submitting}>
                  {submitting ? 'Надсилаємо...' : 'Відправити заявку →'}
                </button>
              </form>
            ) : null}

            <div className="f-success" id="fs" style={{ display: submitted ? 'block' : 'none' }}>
              <div className="f-check">✓</div>
              <h3>Заявку отримано!</h3>
              <p>Дякуємо за рішення. Наш рекрутер зв&apos;яжеться з тобою найближчим часом.</p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
