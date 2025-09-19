import MegaMenu from '@/components/megamenu/megamenu'
import MobileMegaMenuDrawer from '@/components/megamenu/mobileMegamenu';
import React from 'react'
import { CiShoppingCart } from "react-icons/ci";
import { FcSupport } from "react-icons/fc";
import { MdOutlineSupportAgent } from "react-icons/md";
import { menuItems } from './data';



const MegaMenuContent = () => {
  return (
    <div>
      <MegaMenu menuItems={menuItems} interaction="hover" stackedNav={false} />
      <MobileMegaMenuDrawer menuItems={menuItems} useNestedDrawer />
    </div>
  )
}

export default MegaMenuContent
