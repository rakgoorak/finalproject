import * as React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

const images = [
    {
        url: '/assets/reviewproduct/rp1.jpg',
        title: 'การทำงาน',
        width: '50%',
    },
    {
        url: '/assets/reviewservice/rs9.jpg',
        title: 'การให้บริการ',
        width: '50%',
    },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 300,
    [theme.breakpoints.down('sm')]: {
        width: '100% !important', // Overrides inline-style
        height: 200,
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .MuiTypography-root': {
            border: '3px solid currentColor',
        },
    },
}));

const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 50%',
});

const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -3,
    left: 'calc(50% - 10px)',
    transition: theme.transitions.create('opacity'),
}));

export default function Review() {
    return (
        <div className='review'>
            <h2 style={{ textAlign: 'center', padding: '150px', marginTop: '-100px' }}>
                ผลงานของเรา
            </h2>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%', marginTop: '-150px' }}>
                {images.map((image) => (
                    <ImageButton
                        focusRipple
                        key={image.title}
                        style={{
                            width: image.width,
                        }}
                    >
                        <Link key={image.title} to={`/review/${image.title}`}>
                            <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                            <ImageBackdrop className="MuiImageBackdrop-root" />
                            <Image>
                                <Typography
                                    component="span"
                                    variant="subtitle1"
                                    fontSize={20}
                                    color="inherit"
                                    sx={{
                                        position: 'relative',
                                        p: 4,
                                        pt: 2,
                                        pb: (theme) => `calc(${theme.spacing(1)} + 5px)`,
                                    }}
                                >
                                    {image.title}
                                    <ImageMarked className="MuiImageMarked-root" />
                                </Typography>
                            </Image>
                        </Link>
                    </ImageButton>
                ))}
            </Box>
        </div>
    );
}
