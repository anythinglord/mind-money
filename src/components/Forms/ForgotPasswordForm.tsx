import { LoginMode } from '../../models'
import { zodResolver } from '@hookform/resolvers/zod';
import { recoverAccountSchema } from '../../schemas';
import { useForm } from 'react-hook-form';
import { Input, InputCode } from '../Input';
import { concatWithExclude, isTrue } from '../../utils';
import { useMutation } from '@tanstack/react-query';
import { Button } from '../Button';
import { useState } from 'react';
import { forgotPassword, verifyOTP } from '../../services';
import { backdropCloseSubject$, backdropOpenSubject$ } from "../BackDrop";
import './index.css'
interface Props {
    onSwitch: (mode: LoginMode) => void
}

interface TokenVerify {
    email: string
    token: string
}

export const ForgotPasswordForm = ({ onSwitch }: Props) => {

    const [step, setStep] = useState<number>(1);
    const { register, handleSubmit, setError, formState: { errors } } = useForm({
        resolver: zodResolver(recoverAccountSchema(step)),
    });
    
    const onSubmit = (data: any) => {
        //backdropOpenSubject$.setSubject = true
        if (step === 1) {
            const { email } = data;
            verifyAccount.mutate(email)
        }
        if (step === 2) {
            const { email } = data;
            const token = concatWithExclude('email', data)
            console.log('token', token)
            verifyInputToken.mutate({ email: email, token: token })
        }
    }
    
    const verifyAccount = useMutation({
        mutationFn: (email: string) => forgotPassword(email),
        onSuccess: () => {
            setTimeout(()=>{
                setStep((prevStep) => prevStep + 1)
                backdropCloseSubject$.setSubject = true 
            },1500)
        },
        onError: () => {
            backdropCloseSubject$.setSubject = true
            setError('email', {
                type: "custom",
                message: 'Account not found',
            });
        }
    })

    const verifyInputToken = useMutation({
        mutationFn: (data: TokenVerify) => verifyOTP(data.email, data.token),
        onSuccess: (response) => {
            console.log(response)
            /*setTimeout(()=>{
                setStep((prevStep) => prevStep + 1)
                backdropCloseSubject$.setSubject = true 
            },1500)*/
        },
        onError: () => {
            backdropCloseSubject$.setSubject = true
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
            { step === 1 && <>
                <Input
                    label='email' register={register}
                    error={isTrue(errors.email)} errorMessage={errors.email?.message} />
                <div className='box-h-large mt-50'>
                    <Button label='Cancel' variant='outlined' handleClick={() => onSwitch('login')} />
                    <Button label='Next' type='submit' />
                </div>
            </> }
            { step === 2 && <>
                <InputCode register={register} />
                <div className='box-h-large mt-50'>
                    <Button label='Change email' variant='outlined' handleClick={() => setStep((prevStep) => prevStep - 1)} />
                    <Button label='Verify' type='submit' />
                </div>
            </> }
        </form>
    )
}