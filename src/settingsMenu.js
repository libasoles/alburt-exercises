export class SettingsMenu extends HTMLElement {
  connectedCallback() {
    const showTheme = this.hasAttribute("show-theme");

    this.innerHTML = `
      <div class="settings-wrap">
        <button
          id="settings-btn"
          class="settings-btn"
          aria-label="Configuración"
          aria-expanded="false"
        >
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings-icon lucide-settings"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>
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
              : ""
          }
        </div>
      </div>
    `;
  }
}

customElements.define("settings-menu", SettingsMenu);
