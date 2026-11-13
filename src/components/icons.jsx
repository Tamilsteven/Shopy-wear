import React from 'react';
import InstagramRaw from '@mui/icons-material/Instagram';
import FacebookRaw from '@mui/icons-material/Facebook';
import WhatsAppRaw from '@mui/icons-material/WhatsApp';
import TwitterRaw from '@mui/icons-material/Twitter';
import ShoppingCartRaw from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleRaw from '@mui/icons-material/AccountCircleOutlined';
import DeleteOutlinedRaw from '@mui/icons-material/DeleteOutlined';
import ArrowForwardRaw from '@mui/icons-material/ArrowForward';
import LocationOnOutlinedRaw from '@mui/icons-material/LocationOnOutlined';
import LocalPhoneOutlinedRaw from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedRaw from '@mui/icons-material/EmailOutlined';
import LocalShippingRaw from '@mui/icons-material/LocalShippingOutlined';
import DeliveryDiningRaw from '@mui/icons-material/DeliveryDiningOutlined';
import VerifiedRaw from '@mui/icons-material/VerifiedOutlined';

const resolve = (mod) => {
  if (!mod) return () => null;
  if (mod.default) {
    return mod.default.default || mod.default;
  }
  return mod;
};

const makeIcon = (rawModule) => {
  return function IconWrapper(props) {
    const Component = resolve(rawModule);
    if (!Component) return null;
    return <Component {...props} />;
  };
};

export const InstagramIcon = makeIcon(InstagramRaw);
export const FacebookIcon = makeIcon(FacebookRaw);
export const WhatsAppIcon = makeIcon(WhatsAppRaw);
export const TwitterIcon = makeIcon(TwitterRaw);
export const ShoppingCartIcon = makeIcon(ShoppingCartRaw);
export const AccountCircleOutlinedIcon = makeIcon(AccountCircleRaw);
export const DeleteOutlinedIcon = makeIcon(DeleteOutlinedRaw);
export const ArrowForwardIcon = makeIcon(ArrowForwardRaw);
export const LocationOnOutlinedIcon = makeIcon(LocationOnOutlinedRaw);
export const LocalPhoneOutlinedIcon = makeIcon(LocalPhoneOutlinedRaw);
export const EmailOutlinedIcon = makeIcon(EmailOutlinedRaw);
export const LocalShippingIcon = makeIcon(LocalShippingRaw);
export const DeliveryDiningIcon = makeIcon(DeliveryDiningRaw);
export const VerifiedIcon = makeIcon(VerifiedRaw);
