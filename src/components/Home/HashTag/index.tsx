import { Box } from '@mui/material';

interface Props {
  label: string;
}

const HashTag: React.FunctionComponent<Props> = (props) => {
  const { label } = props;
  return (
    <Box component="span" sx={{ mr: 1, cursor: 'pointer' }}>
      #{label}
    </Box>
  );
};

export default HashTag;
