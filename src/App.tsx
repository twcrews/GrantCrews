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
    <div>
    <div id="top"/>
      <div style={Data.Meta.Styles.Body}>

        {/* Navigation bar */}
        <Material.AppBar
          elevation={shadowNav ? 3 : 0}
          position="sticky"
        >
          <Material.Toolbar style={Data.Meta.Styles.Nav}>
            <span style={Data.Meta.Styles.NavItems}>
              <Material.Typography variant="h6">
                {Data.Meta.Owner}
              </Material.Typography>
            </span>
            <span style={Data.Meta.Styles.NavItems}>
              {Data.Meta.Anchors.map(anchor =>
                <Material.Button
                  key={anchor.Name}
                  id={anchor.ID}
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
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center"
        }}>
          <div style={Data.Meta.Styles.Hero} />
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
