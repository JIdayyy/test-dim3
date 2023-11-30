import { Box, Typography } from '@mui/material'

const TextWithLabel = ({ label, text }: { label: string; text: string }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.5rem',
      }}
    >
      <Typography
        sx={{
          fontWeight: 'bold',
        }}
        variant="body1"
      >
        {label}
      </Typography>
      <Typography variant="body1">{text}</Typography>
    </Box>
  )
}

export default TextWithLabel
