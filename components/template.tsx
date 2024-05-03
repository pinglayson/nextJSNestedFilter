import { FunctionComponent } from "react";
import { Car, PageData } from "../interfaces";
import { parse } from "node-html-parser";
// import { DOMParser}

export const PageTemplate: FunctionComponent<PageTemplateProp> = ({
  pageInfo,
  cars,
}) => {
  // get cars and pageInfo from ssr and also refetch from the client side too as data may change quickly

  const carFiltered = cars.filter((car) =>
    car.families.some((family) => family.baseVariantImages.length > 0)
  );

  function htmlDecode(input) {
    let doc = parse(input);
    return doc.textContent;
  }

  function getImage(car) {
    let families = car.families;
    let familyWithImage = families.find(
      (family) => family.baseVariantImages.length > 0
    );

    return familyWithImage.baseVariantImages[0];
  }

  return (
    <div>
      <h1>Cars List</h1>

      <div className="page-info">
        {/* create a component that displays the page info */}
        <div style={{ display: "flex" }}>
          <h2>{pageInfo.title}</h2>
        </div>
        <div style={{ display: "flex" }}>
          <div>{htmlDecode(pageInfo.excerpt)}</div>
        </div>
        <div>{pageInfo.content}</div>
      </div>
      <div
        className="car-cards-container"
        style={{ display: "grid", gridTemplateColumns: "auto auto auto" }}
      >
        {carFiltered.map((car) => (
          <div key={car.uuid}>
            <p>{car.title}</p>
            <img src={getImage(car)} style={{ height: "100px" }} />
          </div>
        ))}
        {/* create a component that displays list of cars
        Only display cars by make name that has atleast one family image.
        Each make cars families must be ordered by image first priority. 
        If a make's families contains two or more images, the order of which family should go to first is not important.
        */}
      </div>
    </div>
  );
};

type PageTemplateProp = {
  pageInfo?: PageData;
  cars?: Car[];
};
