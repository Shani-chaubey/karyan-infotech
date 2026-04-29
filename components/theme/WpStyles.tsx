/**
 * Mirrors WordPress enqueue order for TheRoof + Elementor (karyaninfratech.co.in).
 * Keeps typography, colors, and layout aligned with the live site.
 */
export default function WpStyles() {
  const base = "/wp";
  const sheets = [
    `${base}/bootstrap.min.css`,
    `${base}/swiper.min.css`,
    `${base}/fontawesome-all.min.css`,
    `${base}/elementor-frontend.min.css`,
    `${base}/post-8.css`,
    `${base}/elementor-global.css`,
    `${base}/widget-heading.min.css`,
    `${base}/widget-image.min.css`,
    `${base}/widget-image-box.min.css`,
    `${base}/theroof-add-ons.min.css`,
    `${base}/theroof-style.css`,
    `${base}/cf7-styles.css`,
    `${base}/post-9961.css`,
    `${base}/post-10024.css`,
    `${base}/post-8461.css`,
    `${base}/next-wp-tweaks.css`,
  ];
  return (
    <>
      {sheets.map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
      <style
        dangerouslySetInnerHTML={{
          __html: `
:root{--themecolor:#655e56}
body{background-color:#e7e3df;color:#2f2c29}
p{color:#7a736c}
a{color:#655e56}
a:hover{color:#4f4943}
.gray-bg{background-color:#d9d3cd}
.top-bar{background-color:rgba(101,94,86,1)}
.header-inner{background-color:#f0edea}
.nav-holder nav li ul{background-color:#3d3934}
.vismobmenu{background-color:#3d3934}
.nav-holder nav li a{color:#2f2c29}
.nav-holder nav li a:hover{color:rgba(101,94,86,1)}
.nav-holder nav li.current-menu-item>a,.nav-holder nav li.current-menu-ancestor>a,.nav-holder nav li.current-menu-parent>a{color:rgba(101,94,86,1)}
.nav-holder nav li ul a{color:#ffffff}
.nav-holder nav li ul a:hover{color:#a29c95}
.nav-holder nav li ul li.current-menu-item>a,.nav-holder nav li ul li.current-menu-ancestor>a,.nav-holder nav li ul li.current-menu-parent>a{color:#a29c95}
.menusb a{color:#ffffff}
.vismobmenu nav li.current-menu-item>a,.vismobmenu nav li.current-menu-ancestor>a,.vismobmenu nav li.current-menu-parent>a{color:#a29c95}
.sub-footer{display:none;}
`,
        }}
      />
    </>
  );
}
