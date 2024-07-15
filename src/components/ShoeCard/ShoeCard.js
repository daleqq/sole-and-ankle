import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          <Tag variant={variant} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <PriceWrapper>
            { variant === 'on-sale' ? (
              <>
                <Price variant={variant}><s>{formatPrice(price)}</s></Price>
                <SalePrice>{formatPrice(salePrice)}</SalePrice>
              </>
              ) : (
                <Price>{formatPrice(price)}</Price>
              )
            }
          </PriceWrapper>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 1 340px;
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: ${(props) => props.variant === 'on-sale' ? COLORS.gray[700] : 'inherit'}
`;

const PriceWrapper = styled.span`
  position: relative;
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
  margin-top: 6px;
  position: absolute;
  right: 0px;
  top: 1rem;
`;

const TagWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  border-radius: 2px;
  padding: 9px;
  color: white;
  font-size: ${14 / 16}rem;
  background-color: var(--tagBackground);
`;

const Tag = ({ variant }) => {
  let text;
  let background;

  if (variant === 'on-sale') {
    text = 'Sale';
    background = COLORS.primary;
  } else if (variant === 'new-release') {
    text = 'Just Released!'
    background = COLORS.secondary;
  }

  return (
    <TagWrapper style={{'--tagBackground': background}}>
      {text}
    </TagWrapper>
  )
}

export default ShoeCard;
