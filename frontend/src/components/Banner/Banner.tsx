import { Typography } from "@mui/material";
import { FC } from "react";

const bannerStyle: React.CSSProperties = {
  width: '100%',
  height: '180px',
  background: 'linear-gradient(90deg, #fddfa1 0%, #FFF8DC 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '32px',
  borderRadius: '16px',
  boxShadow: '0 4px 24px rgba(255, 215, 0, 0.2)',
  overflow: 'hidden'
};

export const Banner: FC = () => {
    return(
        <div style={{ ...bannerStyle, height: '270px', paddingLeft: 40, paddingRight: 40, justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/logo.png"
            alt="Logo"
            style={{
              height: 240,
              marginRight: 56,
              filter: 'drop-shadow(0 4px 16px rgba(218,165,32,0.25))',
            }}
          />
          <div>
            <Typography variant="h2" align="center" fontWeight="bold" color="#6d4c00">
              Matan Parfumerie
            </Typography>
            <Typography variant="h5" align="center" color="#7c6f57">
              Discover our exclusive collection of fragrances
            </Typography>
          </div>
        </div>
      </div>
    )
};