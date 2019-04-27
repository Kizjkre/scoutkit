import React from 'react';
import Typography from '@material-ui/core/Typography';
import NavBar from './NavBar';

/**
 * Body component
 *
 * Body of the homepage
 */
export default function Body() {
  return (
    <>
      <Typography variant="h1">ScoutKit</Typography>
      <NavBar />
    </>
  );
}
