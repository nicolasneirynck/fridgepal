import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router'; 
import { FormProvider, useForm } from 'react-hook-form';
import LabelInput from '../components/LabelInput';
import { useAuth } from '../contexts/auth';
import Error from '../components/Error';
import { Link } from 'react-router';

const validationRules = {
  email: {
    required: 'Email is required',
  },
  password: {
    required: 'Password is required',
  },
};

export default function Login() {
  const { search } = useLocation();
  const { error, loading, login } = useAuth();
  const navigate = useNavigate();

  // TODO -> dit afzetten in productie
  const methods = useForm({
    defaultValues: {
      email: 'thomas.aelbrecht@hogent.be',
      password: '12345678',
    },
  });

  // const methods = useForm();
  const { handleSubmit, reset } = methods;

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  const handleLogin = useCallback(
    async ({ email, password }) => {
      const loggedIn = await login(email, password);
      
      if (loggedIn) {
        const params = new URLSearchParams(search);
        navigate({
          pathname: params.get('redirect') || '/',
          replace: true,
        });
      }
    },
    [login, navigate, search],
  );

  return (
    <main className='flex flex-col items-center'>
      <FormProvider {...methods}>
        <form className="flex flex-col items-center w-full"
          onSubmit={handleSubmit(handleLogin)}>
          <div 
            className="bg-[var(--brand-light)] w-1/3 border border-[#e5e7eb] rounded-xl p-6"
          >
            <h1 className='mb-6 text-[var(--brand-gray-dark)] text-center'>Log in</h1>
            <Error error={error} />
            <LabelInput
              label='E-mail'
              type='text'
              name='email'
              placeholder='your@email.com'
              validationRules={validationRules.email}
              data-cy='email_input'
            />

            <LabelInput
              label='Wachtwoord'
              type='password'
              placeholder='password'
              name='password'
              validationRules={validationRules.password}
              data-cy='password_input'
            />

            <div className="flex gap-4 mt-6 justify-center">
              <button type="submit" 
                className="bg-[var(--brand-dark)] rounded-xl px-10 py-3 text-white font-medium hover:cursor-pointer"
                disabled={loading}
                data-cy='submit_btn'
              >Login</button>
              <button type="button" 
                className="bg-white rounded-xl px-10 py-3 text-[var(--brand-dark)] 
                border border-[var(--brand-dark)] font-medium hover:cursor-pointer"
                onClick={handleCancel}
              >Annuleer</button>
            </div>
          </div>
        </form>
      </FormProvider>
      <div className='mt-5'>
        <span className="text-[var(--brand-gray-light)]">Nog geen account?</span>
        <Link className="text-[var(--brand-orange)] px-3 py-1 rounded-xl" to='/register'>
          Registreren
        </Link></div> 
      
    </main>
  );
}
