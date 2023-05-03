import { useState, useRef } from 'react';
import hitToast from '../helpers/hitToast';

export default function SubscriptionForm() {
  let [email, setEmail] = useState('');
  let [alertClass, setAlertClass] = useState('');
  var parentComp = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate(email)) {
      setAlertClass('alert-validate');
      return;
    }

    fetch('http://103.108.146.90:5000/sendemail', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ email })
    })
      .then(res => res.json())
      .then(data => {
        // hitToast(data.success ? 'success' : 'error', data.message)
        hitToast('success', 'Email successfully done!');
        e.target.reset();
      })
      .catch(() => {
        hitToast('error', 'Something went wrong. Please try again.');
        e.target.reset();
      });

    setAlertClass('');
  }

  const validate = (email) => {
    email = email.trim();
    if (/([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)/.test(email)) {
      return true;
    }
    return false;

    // if (email.trim(/^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/).match() == null) {
    //   return false;
    // } else if (email.trim() === '') {
    //   return false;
    // }

    // return true;
  }

  return (
    <form className="w-full flex-w flex-c-m validate-form" onSubmit={handleSubmit}>
      <div ref={parentComp} className={"wrap-input100 validate-input where1 " + alertClass} data-validate="Valid email is required: user@email.domain">
        <input className="input100 placeholder0 s2-txt2" type="text" name="email" placeholder="Enter Email Address" onChange={e => setEmail(e.target.value)} />
        <span className="focus-input100"></span>
      </div>

      <button className="flex-c-m size3 s2-txt3 how-btn1 trans-04 where1">
        Subscribe
      </button>
    </form>
  );
}