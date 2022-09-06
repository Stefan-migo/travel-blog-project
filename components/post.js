import Image from 'next/image';
import style from '../styles/Post.module.css';
import Link from 'next/link';

const Post = ({ post }) => {
    const { title, thumbnail, slug, categories } = post
    return (
        <Link href={`posts/${slug}`}>
            <a>
                <div className={style.post} style={{border: `1px solid ${categories[0].color.css}`}} >
                    <Image
                        className={style.image}
                        src={thumbnail.url}
                        layout="fill" />
                    <div className={style.overlay}>
                        <h1>{title}</h1>
                    </div>
                    <div className={style.badge} style={{backgroundColor: categories[0].color.css}}>
                        <h3>{categories[0].name}</h3>
                    </div>

                </div>
            </a>
        </Link>

    );
}

export default Post;