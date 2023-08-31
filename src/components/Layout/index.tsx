import React from 'react';
import { INFO } from '../../utils/constants/Info';
import styles from '../../utils/styles/Layout.module.scss';

type LayoutProps = {
	children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
	return (
		<div>
			<div className={styles.header}>
				<header>
					<h1>
						{INFO.OWNER} / {INFO.REPO}
					</h1>
				</header>
			</div>
			<main>{children}</main>
		</div>
	);
}
export default Layout;
