import React from 'react';
import axios from 'axios';

const Signup = (props) => (
  <div id="signup">
    <form>
      <input type="text" id="displayname" name="Display name" />
      <input type="text" id="password" name="Password" />
      <input type="text" id="city" name="City" />
      <input type="text" id="state" name="State" />
    </form>
    <button type="submit">Sign up</button>
  </div>
);

export default Signup;
