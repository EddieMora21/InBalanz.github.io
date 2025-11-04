import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useThemeCustomizer } from '../hooks/useThemeCustomizer';
import { PAGES_STRUCTURE, PRESET_PALETTES, BRAND_COLORS } from '../config/themeConfig';

const ThemeCustomizer = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('pages'); // 'pages' or 'presets'
  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const { theme, updateColor, applyPreset, resetTheme, exportTheme } = useThemeCustomizer();

  const currentLang = i18n.language;

  const togglePanel = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSelectedPage(null);
      setSelectedSection(null);
    }
  };

  const handleColorSelect = (sectionId, colorHex) => {
    updateColor(sectionId, colorHex);
  };

  const handlePageClick = (pageId) => {
    setSelectedPage(selectedPage === pageId ? null : pageId);
    setSelectedSection(null);
  };

  const handleSectionClick = (sectionId) => {
    setSelectedSection(selectedSection === sectionId ? null : sectionId);
  };

  const handlePresetClick = (presetColors) => {
    applyPreset(presetColors);
    setSelectedPage(null);
    setSelectedSection(null);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className="theme-customizer-button"
        onClick={togglePanel}
        title={currentLang === 'es' ? 'Personalizar Colores' : 'Customize Colors'}
      >
        <i className="fas fa-palette"></i>
      </button>

      {/* Side Panel */}
      <div className={`theme-customizer-panel ${isOpen ? 'open' : ''}`}>
        <div className="theme-customizer-header">
          <h3>
            <i className="fas fa-palette"></i>
            {currentLang === 'es' ? 'Personalizar Colores' : 'Customize Colors'}
          </h3>
          <button className="close-button" onClick={togglePanel}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Tabs */}
        <div className="theme-customizer-tabs">
          <button
            className={`tab-button ${activeTab === 'pages' ? 'active' : ''}`}
            onClick={() => { setActiveTab('pages'); setSelectedPage(null); setSelectedSection(null); }}
          >
            <i className="fas fa-sitemap"></i>
            {currentLang === 'es' ? 'Por Página' : 'By Page'}
          </button>
          <button
            className={`tab-button ${activeTab === 'presets' ? 'active' : ''}`}
            onClick={() => { setActiveTab('presets'); setSelectedPage(null); setSelectedSection(null); }}
          >
            <i className="fas fa-swatchbook"></i>
            {currentLang === 'es' ? 'Paletas' : 'Palettes'}
          </button>
        </div>

        {/* Content */}
        <div className="theme-customizer-content">
          {activeTab === 'pages' && (
            <div className="pages-customizer">
              <p className="section-description">
                {currentLang === 'es'
                  ? 'Selecciona una página, luego una sección y elige un color de la marca'
                  : 'Select a page, then a section and choose a brand color'}
              </p>

              <div className="pages-list">
                {PAGES_STRUCTURE.map((page) => (
                  <div key={page.id} className="page-item-wrapper">
                    {/* Page Header */}
                    <div
                      className={`page-item ${selectedPage === page.id ? 'active' : ''}`}
                      onClick={() => handlePageClick(page.id)}
                    >
                      <div className="page-item-left">
                        <i className={`fas ${page.icon} page-icon`}></i>
                        <div className="page-info">
                          <span className="page-name">{page.name[currentLang]}</span>
                          <span className="page-description">{page.description[currentLang]}</span>
                        </div>
                      </div>
                      <div className="page-item-right">
                        <span className="section-count">{page.sections.length}</span>
                        <i className={`fas fa-chevron-${selectedPage === page.id ? 'up' : 'down'} chevron-icon`}></i>
                      </div>
                    </div>

                    {/* Sections List (expanded when page is selected) */}
                    {selectedPage === page.id && (
                      <div className="sections-list-nested">
                        {page.sections.map((section) => (
                          <div key={section.id} className="section-item-wrapper-nested">
                            <div
                              className={`section-item-nested ${selectedSection === section.id ? 'active' : ''}`}
                              onClick={() => handleSectionClick(section.id)}
                            >
                              <div className="section-item-left">
                                <i className={`fas ${section.icon} section-icon-nested`}></i>
                                <span className="section-label-nested">{section.label[currentLang]}</span>
                              </div>
                              <div className="section-item-right">
                                <div
                                  className="current-color-preview-nested"
                                  style={{ backgroundColor: theme[section.id] }}
                                  title={theme[section.id]}
                                ></div>
                                <i className={`fas fa-chevron-${selectedSection === section.id ? 'up' : 'down'} chevron-icon-small`}></i>
                              </div>
                            </div>

                            {/* Color Picker Dropdown */}
                            {selectedSection === section.id && (
                              <div className="color-picker-dropdown-nested">
                                <div className="brand-colors-grid">
                                  {BRAND_COLORS.map((color) => (
                                    <div
                                      key={color.id}
                                      className={`brand-color-option ${theme[section.id] === color.hex ? 'selected' : ''}`}
                                      onClick={() => handleColorSelect(section.id, color.hex)}
                                      title={`${color.name[currentLang]} - ${color.hex}`}
                                    >
                                      <div
                                        className="color-circle"
                                        style={{ backgroundColor: color.hex }}
                                      >
                                        {theme[section.id] === color.hex && (
                                          <i className="fas fa-check check-icon"></i>
                                        )}
                                      </div>
                                      <span className="color-name">{color.name[currentLang]}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'presets' && (
            <div className="preset-palettes">
              <p className="section-description">
                {currentLang === 'es'
                  ? 'Selecciona una combinación de colores predefinida para toda la página'
                  : 'Select a predefined color combination for the entire page'}
              </p>

              {PRESET_PALETTES.map((preset, index) => (
                <div
                  key={index}
                  className="preset-item"
                  onClick={() => handlePresetClick(preset.colors)}
                >
                  <div className="preset-header">
                    <span className="preset-name">{preset.name[currentLang]}</span>
                    <i className="fas fa-check-circle preset-apply-icon"></i>
                  </div>
                  <div className="preset-colors-preview">
                    <div className="preset-color-row">
                      <div
                        className="preset-color-box large"
                        style={{ backgroundColor: preset.colors.global_headerBg }}
                        title={currentLang === 'es' ? 'Header' : 'Header'}
                      ></div>
                      <div
                        className="preset-color-box large"
                        style={{ backgroundColor: preset.colors.home_heroButtons }}
                        title={currentLang === 'es' ? 'Botones' : 'Buttons'}
                      ></div>
                    </div>
                    <div className="preset-color-row">
                      <div
                        className="preset-color-box"
                        style={{ backgroundColor: preset.colors.projects_filterButtonsActive }}
                      ></div>
                      <div
                        className="preset-color-box"
                        style={{ backgroundColor: preset.colors.home_featuredBg }}
                      ></div>
                      <div
                        className="preset-color-box"
                        style={{ backgroundColor: preset.colors.home_cardBg }}
                      ></div>
                      <div
                        className="preset-color-box"
                        style={{ backgroundColor: preset.colors.projectDetail_metaBg }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="theme-customizer-actions">
          <button className="action-button reset-button" onClick={resetTheme}>
            <i className="fas fa-undo"></i>
            {currentLang === 'es' ? 'Restablecer' : 'Reset'}
          </button>
          <button className="action-button export-button" onClick={exportTheme}>
            <i className="fas fa-download"></i>
            {currentLang === 'es' ? 'Exportar' : 'Export'}
          </button>
        </div>

        {/* Info Note */}
        <div className="theme-customizer-note">
          <i className="fas fa-info-circle"></i>
          <small>
            {currentLang === 'es'
              ? 'Los cambios se guardan automáticamente y se aplican en tiempo real'
              : 'Changes are saved automatically and applied in real-time'}
          </small>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="theme-customizer-overlay" onClick={togglePanel}></div>}
    </>
  );
};

export default ThemeCustomizer;
