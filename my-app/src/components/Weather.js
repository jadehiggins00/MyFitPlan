import React, { useEffect } from 'react';

function WeatherWidget() {
  useEffect(() => {
    const scriptId = 'weatherwidget-io-js';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://weatherwidget.io/js/widget.min.js';
      document.body.appendChild(script);
    }
  }, []);

  return (
    <a
      className="weatherwidget-io"
      href="https://forecast7.com/en/53d35n6d26/dublin/"
      data-label_1="DUBLIN"
      data-label_2="WEATHER"
      data-font="Roboto"
      data-mode="Current"
      data-days="5"
      data-theme="pure"
    >
      DUBLIN WEATHER
    </a>
  );
}

export default WeatherWidget;