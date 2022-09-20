import { AiFillInstagram, AiOutlineGithub, AiOutlineLinkedin } from 'react-icons/ai';
import Link from 'next/link'
import style from '../styles/Footer.module.css'
import LogoBold from '../components/assets/LogoBold'

const Footer = () => {
    return (
        <footer className={style.footer}>
            <div className={'container ' + style.headerContainer}>
                <Link href='/'>
                    <a className={style.logo}> <LogoBold /> </a>
                </Link>
                <h5>Web page created by Stefan Miranda</h5>
            </div>
            <div className={style.snicons}>
                <Link href='https://www.instagram.com/leberland/'>
                    <a><AiFillInstagram /></a>
                </Link>
                <Link href='https://github.com/Stefan-migo'>
                    <a><AiOutlineGithub /></a>
                </Link>
                <Link href='https://www.linkedin.com/in/stefan-miranda-gonzalez-787387118/'>
                    <a><AiOutlineLinkedin /></a>
                </Link>
            </div>

        </footer>
    );
}

export default Footer;