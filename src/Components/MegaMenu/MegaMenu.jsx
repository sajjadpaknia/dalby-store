import { Link } from "react-router-dom";
import Gallery from "../Gallery/Gallery";
import MegaMenuMsg from "../MegaMenuMsg/MegaMenuMsg";
import MegaMenuTitle from "../MegaMenuTitle/MegaMenuTitle";
import MobileApp from "../MobileApp/MobileApp";
import ServiceItem from "../ServiceItem/ServiceItem";
import { galleryData } from "./Data";
import { servicesData } from "./Data";
import classes from "./MegaMenu.module.css";
export default function MegaMenu({ setMegaMenuState, megaMenuState }) {
  return (
    <>
      <div className={`${classes.menu} ${megaMenuState ? classes.show : null}`}>
        <div
          className={classes.close}
          onClick={() => {
            setMegaMenuState(false);
          }}
        >
          <i className="fa-regular fa-xmark"></i>
        </div>
        <div className={classes.wrapper}>
          <div className={classes.category}>
            <MegaMenuTitle title={"Category"} />
            <div className={classes.gallery}>
              {galleryData.map((item) => {
                return (
                  <Link key={item.id} to={item.to}>
                    <Gallery
                      badgeTitle={item.badgeTitle}
                      badgeBKColor={item.badgeBKColor}
                      description={item.description}
                      background={item.background}
                      alt={item.alt}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
          <div className={classes.group}>
            <div className={classes.subCatagories}>
              <MegaMenuTitle title={"Dolbi Subcategories"} />
              <div className={classes.services}>
                {servicesData.map((item) => {
                  return (
                    <Link key={item.id} to={item.to}>
                      <ServiceItem
                        logo={item.logo}
                        title={item.title}
                        desc={item.description}
                        alt={item.alt}
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className={classes.mobileApp}>
              <MegaMenuTitle title={"Mobile App"} />
              <div className={classes.mobileAppContainer}>
                <MobileApp />
              </div>
            </div>
          </div>
        </div>
        <MegaMenuMsg />
      </div>
    </>
  );
}
