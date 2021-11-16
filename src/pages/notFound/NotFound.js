import styles from './NotFound.module.css';

export default function NotFound() {
    return (
        <div className={styles['not-found']}>
            <p>The requested page is not found</p>
        </div>
    )
}
