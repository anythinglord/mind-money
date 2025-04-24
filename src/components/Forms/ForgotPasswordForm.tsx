import { LoginMode } from '../../models'
import { zodResolver } from '@hookform/resolvers/zod';
import { recoverAccountSchema } from '../../schemas';
import { useForm } from 'react-hook-form';
import { Input, InputCode } from '../Input';
import { isTrue } from '../../utils';
import { useMutation } from '@tanstack/react-query';
import { Button } from '../Button';
import { useState } from 'react';
import './index.css'
import { verifyEmail } from '../../services';
interface Props {
    onSwitch: (mode: LoginMode) => void
}

export const ForgotPasswordForm = ({ onSwitch }: Props) => {

    const [step, setStep] = useState<number>(1);
    const { register, handleSubmit, setError, formState: { errors } } = useForm({
        resolver: zodResolver(recoverAccountSchema(step)),
    });
    
    const onSubmit = (data: any) => {
        const { email } = data;
        console.log(email)
        verifyAccount.mutate(email)
    }
    
    const verifyAccount = useMutation({
        mutationFn: (email: string) => verifyEmail(email),
        onSuccess: (data) => {
            console.log('data =>', data)
            setStep((prevStep) => prevStep + 1)
        },
        onError: (error) => {
            console.log(error)
            setError('email', {
                type: "custom",
                message: 'Account not found',
            });
        }
    })

    return(
        <form onSubmit={handleSubmit(onSubmit)} className='form-container'>
            <div className="title">Recover account</div>
            <div className="message">
                {step === 1 && 'Enter your email to find your account '}
                {step === 2 && 'Verify the 6 digit code in the email'}
            </div>
            {step === 1 && <>
                <Input
                    label='email' register={register}
                    error={isTrue(errors.email)} errorMessage={errors.email?.message} />
                <div className='box-h-large mt-50'>
                    <Button label='Cancel' variant='outlined' handleClick={() => onSwitch('login')} />
                    <Button label='Next' type='submit' />
                </div>
            </>}
            { step === 2 && <>
                <InputCode />
                <div className='box-h-large mt-50'>
                    <Button label='Change email' variant='outlined' handleClick={() => setStep((prevStep) => prevStep - 1)} />
                    <Button label='Verify' handleClick={() => setStep((prevStep) => prevStep + 1)} />
                </div>
            </>}
        </form>
    )
}