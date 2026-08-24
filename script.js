const SUPABASE_URL = 'https://ibsnupifhuuevennrrjw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlic251cGlmaHV1ZXZlbm5ycmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1OTU0MjAsImV4cCI6MjEwMzE3MTQyMH0.AdMpNHRead-UgsZSNk-bDm1TK22M-kkJ8FZ-vM5kEtw';
const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const form = document.querySelector('#auth-form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const showPassword = document.querySelector('#show-password');
const submit = document.querySelector('#submit');
const feedback = document.querySelector('#feedback');

client.auth.signOut({ scope: 'local' });

showPassword.addEventListener('click', () => {
  const visible = password.type === 'text';
  password.type = visible ? 'password' : 'text';
  showPassword.textContent = visible ? 'Ver senha' : 'Ocultar senha';
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  feedback.textContent = '';
  submit.disabled = true;
  submit.textContent = 'Verificando...';

  const { error } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  submit.disabled = false;
  submit.textContent = 'Entrar';
  feedback.textContent = error
    ? 'E-mail ou senha incorretos.'
    : 'Acesso autorizado.';
});
