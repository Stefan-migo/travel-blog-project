import Link from 'next/link'
import style from '../styles/Header.module.css'
import { graphCms } from '../lib/graphCms'
import { useEffect, useState } from 'react'

const Header = () => {
    const [categoryLinks, setCategoryLinks] = useState([]);

    async function fetchCategories() {
        const { categories } = await graphCms.request(
            `query MyQuery {
                categories {
                  color {
                    css
                  }
                  name
                }
            }`
        )
        setCategoryLinks(categories)
    }
    useEffect(()=>{
        fetchCategories()
    },[])

    return (
        <header className={style.header}>
            <div className={'container ' + style.headerContainer}>
                <Link href='/'>
                    <a className={style.logo}>Travel Blog</a>
                </Link>
                <ul>
                    {
                        categoryLinks.map(link => (
                            <li key={link.name}>
                                <Link href={`/${link.name}`}>
                                    <a style={{color:link.color.css}}>
                                        {link.name}
                                    </a>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>

        </header>
    );
}

export default Header;