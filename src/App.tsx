import React from 'react';
import * as Material from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Data from './Data.json';

function App() {
  const handleLink = (url: string) => { window.open(url, "_blank"); };

  return (
    <div style={Data.Meta.Styles.Global as React.CSSProperties}>

      {/* Header/hero */}
      <div style={Data.Meta.Styles.Header as React.CSSProperties}>
        <div style={Data.Meta.Styles.Hero} />
        <Material.Typography
          id="title"
          variant="h1"
          paragraph
          style={Data.Meta.Styles.Heading}
        >
          {Data.Header.Title}
        </Material.Typography>
        <Material.Typography
          id="subtitle"
          variant="h4"
          style={Data.Meta.Styles.Heading}
        >
          {Data.Header.Subtitle}
        </Material.Typography>
        <div />
      </div>

      {/* Attributes */}
        {Data.Attributes.map(attr =>
          <div 
            key={attr.Name} 
            style={Data.Meta.Styles.Attribute as React.CSSProperties}
          >
            <span style={Data.Meta.Styles.IconHeading}>
              <Icon fontSize="default" color="primary">
                {attr.Icon}
              </Icon>
              <Material.Typography variant="h5">
                {attr.Name}
              </Material.Typography>
            </span>
            <div>
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

      <footer style={Data.Meta.Styles.Footer as React.CSSProperties}>
        <div>
          <Material.Typography>
            {Data.Footer.Copyright.replace("{year}",
              new Date().getFullYear().toString())}
          </Material.Typography>
          <Material.Typography variant="caption" paragraph>
            {Data.Footer.Subtext}
          </Material.Typography>
          <Material.Button
            variant="contained"
            color="secondary"
            size="small"
            disableElevation
            onClick={() => handleLink(Data.Footer.PromotionLink)}
            style={Data.Meta.Styles.Heading}
          >
            {Data.Footer.PromotionText}
          </Material.Button>
        </div>
      </footer>
    </div>
  );
}

export default App;
