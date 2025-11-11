import { useAuth } from '../contexts/auth';
import {useCallback, useMemo} from 'react';
import { useNavigate } from 'react-router';
import {FormProvider, useForm} from 'react-hook-form';
import LabelInput from '../components/LabelInput';
import Error from '../components/Error';

export default function Register(){

  const {
    error, loading, register,
  } = useAuth();

  const navigate = useNavigate();

  const methods = useForm();
  const {
    getValues, handleSubmit, reset,
  } = methods;

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  const handleRegister = useCallback(
    async ({
      firstName,lastName, email, password,
    }) => {
      const loggedIn = await register({
        firstName,lastName, email, password,
      });

      if (loggedIn) {
        navigate({
          pathname: '/',
          replace: true,
        });
      }
    },
    [register, navigate],
  );

  const validationRules = useMemo(() => ({
    firstName: { required: 'Voornaam is verplicht' },
    lastName: { required: 'Familienaam is verplicht' },
    email: { required: 'E-mail is verplicht', pattern:{value:
      /^[a-zA-Z0–9._%+-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,}$/,
    message:'Invalide e-mail'} },
    password: { required: 'Wachtwoord is verplicht' },
    confirmPassword: {
      required: 'Wachtwoord confirmatie is verplicht',
      validate: (value) => {
        const password = getValues('password');
        return password === value || 'Wachtwoorden matchen niet';
      },
    },
  }), [getValues]);

  return(
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleRegister)} 
        className="flex flex-col items-center w-full">
          
        <div 
          className="bg-[var(--brand-light)] w-1/3 border border-[#e5e7eb] rounded-xl p-6"
        >
          <h1 className="mb-4 text-[var(--brand-gray-dark)] text-center">Registreren</h1>
          <Error error={error} />
          <LabelInput
            label='Voornaam'
            type='text'
            name='firstName'
            placeholder='Je voornaam'
            validationRules={validationRules.firstName}
          />
          <LabelInput
            label='Familienaam'
            type='text'
            name='lastName'
            placeholder='Je familienaam'
            validationRules={validationRules.lastName}
          />
          <LabelInput
            label='E-mail'
            type='text'
            name='email'
            placeholder='your@email.com'
            validationRules={validationRules.email}
          />
          <LabelInput
            label='Password'
            type='password'
            name='password'
            validationRules={validationRules.password}
          />
          <LabelInput
            label='Confirm password'
            type='password'
            name='confirmPassword'
            validationRules={validationRules.confirmPassword}
          />
        </div>
        <div className="flex gap-4 mt-6 justify-center">
          <button type="submit" 
            className="bg-[var(--brand-dark)] rounded-xl px-10 py-3 text-white font-medium hover:cursor-pointer"
            disabled={loading}
          >Registreer</button>
          <button type="button" 
            className="bg-[var(--brand-dark)] rounded-xl px-10 py-3 text-white font-medium hover:cursor-pointer"
            onClick={handleCancel}
          >Annuleer</button>
        </div>
      </form>
    </FormProvider>
  );
}