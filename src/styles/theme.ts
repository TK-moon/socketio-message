const device_sizes = {
  sm: 360,
  md: 768,
  lg: 1200,
};

const device = {
  mobile: `screen and (min-width: ${device_sizes.sm}px) and (max-width: ${device_sizes.md - 1}px)`,
  tablet: `screen and (min-width: ${device_sizes.md}px) and (max-width: ${device_sizes.lg - 1}px)`,
  desktop: `screen and (min-width: ${device_sizes.lg})`,
};

const size = {
  max_width: '1200px',
  min_width: '360px',
};

const theme = { device, size }

export default theme;
