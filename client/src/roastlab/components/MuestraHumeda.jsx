import { useEffect, useState } from "react";

export const MuestraHumeda = ({ setGrados_B, setP_H, setAcidez , gradosb, ph, acidez, Estadolectura }) => {
  const [Grados_B, setgrados_B] = useState(gradosb);
  const [P_H, setp_H] = useState(ph);
  const [Acidez, setacidez] = useState(acidez);

  useEffect(() => {
    setGrados_B(Grados_B);
    setP_H(P_H);
    setAcidez(Acidez);
  }, [Grados_B, P_H, Acidez]);
  return (
    <>
      <div className="card-body">
        <div className="input-group mb-3">
          <span className="input-group-text col-2" id="basic-addon1">
            *Grados Brix:{" "}
          </span>
          <input
            type="number"
            value={Grados_B || ""}
            onChange={(event) => {
              setgrados_B(event.target.value);
            }}
            className="form-control"
            readOnly={Estadolectura}
            placeholder="Grados Brix"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text col-2" id="basic-addon1">
            *p.H:{" "}
          </span>
          <input
            type="number"
            value={P_H || ""}
            onChange={(event) => {
              setp_H(event.target.value);
            }}
            className="form-control"
            readOnly={Estadolectura}
            placeholder="p.H"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text col-2" id="basic-addon1">
            *Acidez:{" "}
          </span>
          <input
            type="number"
            value={Acidez || ""}
            onChange={(event) => {
              setacidez(event.target.value);
            }}
            className="form-control"
            readOnly={Estadolectura}
            placeholder="Acidez"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
      </div>
    </>
  );
};
