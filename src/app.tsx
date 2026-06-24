import { component$, useSignal, useVisibleTask$, $ } from '@builder.io/qwik';
import { ORGANIZATION_ID, QRATI_SCRIPT_URL, GITHUB_ORG, REPO } from './config';
import { loadUser, login, logout, type AuthUser } from './auth';

const repoUrl = `https://github.com/${GITHUB_ORG}/${REPO}`;
const vscodeUrl = `https://vscode.dev/github/${GITHUB_ORG}/${REPO}`;
const year = new Date().getFullYear();

export const App = component$(() => {
  const theme = useSignal<'light' | 'dark'>('light');
  const user = useSignal<AuthUser | null>(null);
  const email = useSignal('');
  const name = useSignal('');
  const loading = useSignal(false);
  const error = useSignal('');

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    theme.value =
      (localStorage.getItem('qc-theme') as 'light' | 'dark') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme.value);
    user.value = loadUser();

    const styleUrl = QRATI_SCRIPT_URL.replace(/\/web\.es\.js$/, '/styles.css');
    if (!document.querySelector(`link[href="${styleUrl}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = styleUrl;
      document.head.appendChild(link);
    }
    import(/* @vite-ignore */ QRATI_SCRIPT_URL);
  });

  const toggleTheme = $(() => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme.value);
    localStorage.setItem('qc-theme', theme.value);
  });

  const handleSubmit = $(async () => {
    if (!email.value.trim() || !name.value.trim()) {
      error.value = 'Email and name are required.';
      return;
    }
    loading.value = true;
    error.value = '';
    try {
      user.value = await login(email.value.trim(), name.value.trim());
    } catch {
      error.value = 'Login failed. Try again.';
    } finally {
      loading.value = false;
    }
  });

  const handleLogout = $(() => {
    logout();
    user.value = null;
    email.value = '';
    name.value = '';
  });

  return (
    <>
      <button class="theme-toggle" onClick$={toggleTheme} aria-label="Toggle theme">
        {theme.value === 'dark' ? '☀ Light' : '🌙 Dark'}
      </button>

      <div class="page-shell">
        <div class="page-frame">
          <header class="hero">
            <p class="hero-kicker">Qrati Connect Demo</p>
            <h1>
              <a href="https://qrati.com" target="_blank" rel="noopener noreferrer">Qrati</a> Connect inside a Qwik host site
            </h1>
            <p class="hero-copy">
              This example shows how to embed{' '}
              <a href="https://qrati.com" target="_blank" rel="noopener noreferrer">Qrati</a> Connect into a
              Qwik app using the framework-agnostic <strong>web component</strong>, with a host-controlled
              theme and a demo login for organizations that use custom auth.
            </p>

            <div class="action-pills" aria-label="Example links">
              <a href={repoUrl} target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/></svg>
                <span>View on GitHub</span>
              </a>
              <a href={vscodeUrl} target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M10.863 13.919a.8.8 0 0 1-.644.025a.8.8 0 0 1-.279-.183L4.816 9.063l-2.232 1.703a.54.54 0 0 1-.691-.031l-.716-.655a.546.546 0 0 1 0-.805L3.112 7.5L1.177 5.725a.546.546 0 0 1 0-.805l.716-.655a.54.54 0 0 1 .691-.031l2.232 1.703L9.94 1.239a.805.805 0 0 1 .923-.159l2.677 1.295c.281.136.46.422.46.736V8h-3.248V4.534L6.864 7.5l3.888 2.966V8H14v3.889c0 .314-.179.6-.46.736z"/></svg>
                <span>Open in VS Code</span>
              </a>
            </div>
          </header>

          <main class="content-shell">
            {user.value ? (
              <>
                <div class="session-bar">
                  <span>Signed in as <strong>{user.value.fname} {user.value.lname}</strong> ({user.value.email})</span>
                  <button class="btn-ghost" onClick$={handleLogout}>Log out</button>
                </div>
                <div class="widget-frame">
                  {/* @ts-ignore custom element */}
                  <qrati-connect
                    organization-id={ORGANIZATION_ID}
                    uid={user.value.userId}
                    fname={user.value.fname}
                    lname={user.value.lname}
                    theme={theme.value}
                    router="hash"
                  />
                </div>
              </>
            ) : (
              <div class="login-card">
                <h2>Demo sign in</h2>
                <p class="sub">Identify yourself to load the widget as a known user.</p>
                <form class="login-form" preventdefault:submit onSubmit$={handleSubmit}>
                  <div class="field">
                    <label for="name">Full name</label>
                    <input id="name" type="text" value={name.value} onInput$={(e) => (name.value = (e.target as HTMLInputElement).value)} placeholder="John Doe" autocomplete="name" />
                  </div>
                  <div class="field">
                    <label for="email">Email</label>
                    <input id="email" type="email" value={email.value} onInput$={(e) => (email.value = (e.target as HTMLInputElement).value)} placeholder="john@example.com" autocomplete="email" />
                  </div>
                  {error.value && <p class="error">{error.value}</p>}
                  <button class="btn-primary" type="submit" disabled={loading.value}>
                    {loading.value ? 'Signing in…' : 'Sign in & load widget'}
                  </button>
                </form>
              </div>
            )}
          </main>

          <footer class="footer">
            <div class="footer-brand">
              <img src="https://assets.qrati.com/images/qrati-connect-logo-square.png" alt="Qrati Connect logo" referrerPolicy="no-referrer" />
              <div>
                <span class="footer-title"><span>Qrati</span> Connect</span>
                <p>Elevate your event experience.</p>
              </div>
            </div>
            <div class="footer-meta">
              <nav aria-label="Footer navigation">
                <a href="https://qrati.com" target="_blank" rel="noopener noreferrer">qrati.com</a>
                <a href="https://www.npmjs.com/package/@qratilabs/qrati-connect" target="_blank" rel="noopener noreferrer">npm</a>
                <a href={`https://github.com/${GITHUB_ORG}`} target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://qrati.com/pricing" target="_blank" rel="noopener noreferrer">Pricing</a>
              </nav>
              <p class="footer-note">© {year} Qrati Labs. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
});
