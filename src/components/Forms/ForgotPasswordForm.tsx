import { useState, useEffect } from 'react';
import { LoginMode } from '../../models'
import { zodResolver } from '@hookform/resolvers/zod';
import { recoverAccountSchema } from '../../schemas';
import { useForm } from 'react-hook-form';
import { Input, InputCode } from '../Input';
import { concatWithExclude, isTrue } from '../../utils';
import { useMutation } from '@tanstack/react-query';
import { Button } from '../Button';
import { forgotPassword, verifyOTP } from '../../services';
import { backdropCloseSubject$, backdropOpenSubject$ } from "../BackDrop";
import './index.css'
import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from '../../redux/store';
import { setEmail } from '../../redux/states';
interface Props {
    onSwitch: (mode: LoginMode) => void
}

interface TokenVerify {
    email: string 
    token: string
}

interface GenerateOTPData {
    email: string
    refresh: boolean
}

export const ForgotPasswordForm = ({ onSwitch }: Props) => {

    const stateUser = useSelector((store: AppStore) => store.user)
    const [step, setStep] = useState<number>(1);
    const [countDown, setCount] = useState<number>(8);
    const dispatch = useDispatch()
    
    const { register, handleSubmit, setError, formState: { errors } } = useForm({
        resolver: zodResolver(recoverAccountSchema(step)),
    });

    const onSubmit = (data: any) => {
        //backdropOpenSubject$.setSubject = true
        if (step === 1) {
            const { email } = data; 
            dispatch(setEmail(email)); // set email to use once in resendOTP
            verifyAccount.mutate({ email: email, refresh: false })
        }
        if (step === 2) {
            const { email } = data;
            const token = concatWithExclude('email', data)
            if (token.length === 6) {
                verifyInputToken.mutate({ email: email, token: token })
            }
        }
    }

    const resendOTP = () => {
        verifyAccount.mutate({ 
            email: stateUser.email, refresh: true 
        })
    }

    const verifyAccount = useMutation({
        mutationFn: (data: GenerateOTPData) => forgotPassword(data.email, data.refresh),
        onSuccess: (response) => {
            setTimeout(() => {
                if (!response.refresh) setStep((prevStep) => prevStep + 1)
                backdropCloseSubject$.setSubject = true
            }, 1500) 
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
            /*setTimeout(()=>{
                setStep((prevStep) => prevStep + 1)
                backdropCloseSubject$.setSubject = true 
            },1500)*/
        },
        onError: (error) => {
            backdropCloseSubject$.setSubject = true
            setError('input1', {
                type: "custom",
                message: error.message,
            });
        }
    })

    useEffect(() => {

        const interval = setInterval(() => {
            setCount(prevCount => prevCount - 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
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
            {step === 2 && <>
                <InputCode register={register} />
                {countDown > 0 ? <b>Code expires on {countDown}</b> :
                    <Button variant='text' type="button" label="Resend code" handleClick={resendOTP}/>}
                <div className='box-h-large'>
                    <Button label='Change email' variant='outlined' handleClick={() => setStep((prevStep) => prevStep - 1)} />
                    <Button label='Verify' type='submit' />
                </div>
            </>}
        </form>
    )
}