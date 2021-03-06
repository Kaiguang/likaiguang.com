import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

import styles from "./Layout.module.css";

export default function Layout({ children, selectedNavLink }) {
  const data = useStaticQuery(graphql`
    {
      logo: file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fixed(width: 80) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  const handleCopyMyEmailClick = () => {
    const textArea = document.createElement("textarea");
    textArea.value = "hello@likaiguang.com";
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
    setMyEmailTooltipText("Copied");
  };

  const handleMyEmailMouseLeave = () => {
    setMyEmailTooltipText("Click to copy");
  };

  const [myEmailTooltipText, setMyEmailTooltipText] = useState("Click to copy");

  return (
    <div className={styles.container}>
      <header>
        <div className={styles.headerContainer}>
          <div className={styles.headerContent}>
            <Link to="/">
              <Img fixed={data.logo.childImageSharp.fixed} alt="Logo of Kai" />
            </Link>
          </div>
        </div>

        <nav>
          <div className={styles.navContainer}>
            <div className={styles.navContent} data-nosnippet>
              <Link
                to="/"
                className={selectedNavLink === "home" ? styles.selected : null}
              >
                Home
              </Link>
              <Link
                to="/projects"
                className={
                  selectedNavLink === "projects" ? styles.selected : null
                }
              >
                Projects
              </Link>
              <Link
                to="/blog"
                className={selectedNavLink === "blog" ? styles.selected : null}
              >
                Blog
              </Link>
              <Link
                to="/contact"
                className={
                  selectedNavLink === "contact" ? styles.selected : null
                }
              >
                Contact
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <div className={styles.mainContainer}>
          <div className={styles.mainContent}>{children}</div>
        </div>
      </main>

      <footer>
        <div className={styles.footerContainer}>
          <div className={styles.footerContent}>
            <div>Kaiguang Li</div>
            <div>
              <span
                className={styles.myEmail}
                onClick={handleCopyMyEmailClick}
                onKeyPress={handleCopyMyEmailClick}
                onMouseLeave={handleMyEmailMouseLeave}
                role="button"
                tabIndex="0"
              >
                hello@likaiguang.com
                <span className={styles.myEmailTooltipText} data-nosnippet>
                  {myEmailTooltipText}
                </span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  selectedNavLink: PropTypes.string.isRequired,
};
