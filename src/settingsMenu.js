export class SettingsMenu extends HTMLElement {
  connectedCallback() {
    const showTheme = this.hasAttribute('show-theme')

    this.innerHTML = `
      <div class="settings-wrap">
        <button
          id="settings-btn"
          class="settings-btn"
          aria-label="Configuración"
          aria-expanded="false"
        >
          <svg class="settings-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12.22 2h-.44a2 2 0 0 0-1.94 1.51l-.25 1.04a8.06 8.06 0 0 0-1.88.78l-.93-.56a2 2 0 0 0-2.38.31l-.31.31a2 2 0 0 0-.31 2.38l.56.93c-.36.58-.62 1.21-.78 1.88l-1.04.25A2 2 0 0 0 2 11.78v.44a2 2 0 0 0 1.51 1.94l1.04.25c.16.67.42 1.3.78 1.88l-.56.93a2 2 0 0 0 .31 2.38l.31.31a2 2 0 0 0 2.38.31l.93-.56c.58.36 1.21.62 1.88.78l.25 1.04A2 2 0 0 0 11.78 22h.44a2 2 0 0 0 1.94-1.51l.25-1.04a8.06 8.06 0 0 0 1.88-.78l.93.56a2 2 0 0 0 2.38-.31l.31-.31a2 2 0 0 0 .31-2.38l-.56-.93c.36-.58.62-1.21.78-1.88l1.04-.25A2 2 0 0 0 22 12.22v-.44a2 2 0 0 0-1.51-1.94l-1.04-.25a8.06 8.06 0 0 0-.78-1.88l.56-.93a2 2 0 0 0-.31-2.38l-.31-.31a2 2 0 0 0-2.38-.31l-.93.56a8.06 8.06 0 0 0-1.88-.78l-.25-1.04A2 2 0 0 0 12.22 2z"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.75"
            />
            <circle
              cx="12"
              cy="12"
              r="3"
              fill="none"
              stroke="currentColor"
              stroke-width="1.75"
            />
          </svg>
        </button>
        <div id="settings-menu" class="settings-menu" hidden>
          <div class="settings-section">
            <div class="settings-section-label" data-i18n="settingsLang">Idioma</div>
            <div class="settings-opts">
              <button class="settings-opt" data-lang="es">ES</button>
              <button class="settings-opt" data-lang="en">EN</button>
            </div>
          </div>
          ${
            showTheme
              ? `<div class="settings-section">
            <div class="settings-section-label" data-i18n="settingsBoard">Tablero</div>
            <div class="settings-opts">
              <button class="settings-opt" data-theme="default" data-i18n="settingsBoardFlat">
                Plano
              </button>
              <button class="settings-opt" data-theme="3d" data-i18n="settingsBoardWood">
                Staunton
              </button>
            </div>
          </div>`
              : ''
          }
        </div>
      </div>
    `
  }
}

customElements.define('settings-menu', SettingsMenu)
