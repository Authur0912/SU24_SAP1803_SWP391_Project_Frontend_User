import { Stack, Grid, Typography, Box, Chip, Button } from "@mui/material";
import ImagesPreview from "./ImagesPreview";
import { fCurrencyVND } from "../../../utils/formatNumber";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../app/redux/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { PATH_APP } from "../../../routes/paths";

const DetailContainer = ({ data }) => {
  const dispatch = useDispatch();
  const router = useNavigate();

  const { price, size } = data ?? {};
  const { name, image, description, milkBrand, startAge, endAge } =
    data?.product ?? {};

  const handleAddToCart = () => {
    dispatch(addToCart(data));
  };

  const handlePaymentPage = () => {
    router(PATH_APP.checkout);
  };

  const handlePaymentNow = () => {
    handleAddToCart();
    handlePaymentPage();
  };

  return (
    <Grid container p={1}>
      <Grid item xs={12} sm={6}>
        <ImagesPreview image={image?.content} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Stack direction={"column"} spacing={2}>
          <Typography
            component="div"
            color={(theme) => theme.palette.grey[500]}
          >
            Thương hiệu{" "}
            <Box display="inline" sx={{ textDecoration: "underline" }}>
              {milkBrand?.name}
            </Box>
          </Typography>
          <Typography variant="h5">{name}</Typography>
          <Stack direction={"row"}>
            <Chip
              size="small"
              label={milkBrand?.company?.nation}
              variant="filled"
            />
          </Stack>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="body2" fontWeight={400}>
              {fCurrencyVND(price)}
            </Typography>
          </Stack>
          <Stack direction={"column"} spacing={1}>
            <Typography variant="body2" fontWeight={600}>
              Mô tả
            </Typography>
            <Typography variant="body2">{description}</Typography>
          </Stack>
          <Stack direction={"column"} spacing={1}>
            <Typography variant="body2" fontWeight={600}>
              Phân loại
            </Typography>
            <Stack direction={"row"} spacing={1}>
              <Chip
                label={`${startAge} - ${endAge} tuổi`}
                sx={{
                  borderRadius: 1,
                  border: "1px solid",
                  borderColor: "#edeff1",
                  cursor: "pointer",
                }}
              />
              <Chip
                label={`${size} ml`}
                sx={{
                  borderRadius: 1,
                  border: "1px solid",
                  borderColor: "#edeff1",
                  cursor: "pointer",
                }}
              />
            </Stack>
          </Stack>
          <Stack direction={"row"} justifyContent={"space-between"} py={3}>
            <Button
              size={"large"}
              variant="contained"
              sx={{
                borderRadius: 4,
              }}
              onClick={handleAddToCart}
            >
              Thêm vào giỏ hàng
            </Button>
            <Button
              size={"large"}
              color="warning"
              variant="contained"
              sx={{
                borderRadius: 4,
              }}
              onClick={handlePaymentNow}
            >
              Mua ngay
            </Button>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default DetailContainer;
