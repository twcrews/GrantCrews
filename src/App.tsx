import React, { useState } from 'react';
import * as Material from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import Data from './Data.json';

function App() {
  const [shadowNav, setShadowNav] = useState(false);
  
  const handleLink = (url: string) => { window.open(url, "_blank"); };

  useScrollPosition(({ currPos }) => {
    const isScrolled = currPos.y < 0;
    if (isScrolled !== shadowNav) setShadowNav(isScrolled);
  }, [shadowNav]);

  return (
    <div id="page">
      <div id="body-wrap">

        {/* Navigation bar */}
        <div id="top" />
        <Material.AppBar
          id="nav"
          elevation={shadowNav ? 3 : 0}
          position="sticky"
        >
          <Material.Toolbar id="nav-bar">
            <span className="NavItems">
              <img
                id="nav-logo"
                alt="Logo"
                src={Data.Meta.Logo}
              />
              <Material.Typography
                id="nav-title"
                variant="h6"
              >
                {Data.Meta.Owner}
              </Material.Typography>
            </span>
            <span className="NavItems">
              {Data.Meta.Anchors.map(anchor =>
                <Material.Button
                  key={anchor.Name}
                  id={anchor.ID}
                  className="AnchorButton"
                  variant={anchor.Variant as "contained" | "text" | "outlined"}
                  color={anchor.Color as Material.PropTypes.Color}
                  onClick={() => document
                    .getElementById(anchor.Link)
                    ?.scrollIntoView()}
                >
                  {anchor.Name}
                </Material.Button>
              )}
            </span>
          </Material.Toolbar>
        </Material.AppBar>

        {/* Header/hero */}
        <div id="about-section">
          <div
            id="hero"
            style={{ backgroundImage: "url(" + Data.Header.Hero + ")" }}
          />
          <Material.Typography
            id="title"
            variant="h1"
            paragraph
          >
            {Data.Header.Title}
          </Material.Typography>
          <Material.Typography
            id="subtitle"
            variant="h4"
          >
            {Data.Header.Subtitle}
          </Material.Typography>
          <div className="HeaderSpacer" />
        </div>

        {/* Attributes */}
        <div id="attributes-section" className="Content">
          <div className="Attributes">
            {Data.Attributes.map(attr =>
              <div
                key={attr.Name}
                className="AttributeTile"
              >
                <span className="BigIcon">
                  <Icon fontSize="inherit" color="primary">
                    {attr.Icon}
                  </Icon>
                  <Material.Typography variant="h5">
                    {attr.Name}
                  </Material.Typography>
                </span>
                <div className="Multiline GrayText">
                  <Material.Typography color="inherit">
                    {attr.Description}
                  </Material.Typography>
                  <Material.Typography variant="h6" paragraph />
                  {attr.Sections.map(section =>
                    <React.Fragment key={section.Title}>
                      <Material.Typography variant="h6">
                        {section.Title}
                      </Material.Typography>
                      {section.Content.map(item =>
                        <Material.Typography key={item}>
                          {item}
                        </Material.Typography>
                      )}
                      <Material.Typography variant="h6" paragraph />
                    </React.Fragment>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="SectionSpacer" />

        {/* Project portfolio */}
        <div className="Content" id="portfolio-section">
          <Material.Typography
            variant="h3"
            paragraph
            className="SectionHeader"
          >
            {Data.Portfolio.Title}
          </Material.Typography>
          <span className="GrayText">
            <Material.Typography variant="subtitle1" paragraph>
              {Data.Portfolio.Description}
            </Material.Typography>
          </span>
          <div className="PortfolioTiles">
            {Data.Portfolio.Projects.map(project =>
              project.Enabled ?
                <div
                  key={project.Title}
                  className="PortfolioProject"
                  style={{
                    backgroundImage: "url(" + project.Image + ")",
                    backgroundColor: "#00b9ff",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                >
                  <div
                    className="Darken FullHeight"
                    onClick={() => project.Enabled ?
                      handleLink(project.Link) :
                      null}
                  >
                    <div className="ProjectTypography">
                      <Material.Typography variant="h6">
                        {project.Title}
                      </Material.Typography>
                      <Material.Typography
                        variant="caption"
                        style={{ textTransform: "uppercase" }}
                      >
                        {project.Year}
                      </Material.Typography>
                      <Material.Typography
                        variant="subtitle2"
                        style={{ opacity: 0.8 }}
                      >
                        {project.Description}
                      </Material.Typography>
                    </div>
                  </div>
                </div> : null
            )}
          </div>
        </div>
        <div className="SectionSpacer" />
      </div>

      <footer id="footer">
        <div className="Content GrayText">
          <Material.Typography>
            {Data.Footer.Copyright.replace("{year}", 
              new Date().getFullYear().toString())}
          </Material.Typography>
          <Material.Typography variant="caption" paragraph>
            {Data.Footer.Subtext}
          </Material.Typography>
          <Material.Button
            variant="contained"
            color="primary"
            size="small"
            disableElevation
            onClick={() => handleLink(Data.Footer.PromotionLink)}
          >
            {Data.Footer.PromotionText}
          </Material.Button>
        </div>
      </footer>
    </div>
  );
}

export default App;
