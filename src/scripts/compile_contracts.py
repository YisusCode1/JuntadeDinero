from pyteal import compileTeal, Mode
import os


def compile_contract(contract_name):
    contract_path = os.path.join("src", "contracts", f"{contract_name}.teal")
    compiled_path = os.path.join(
        "src", "contracts", f"{contract_name}_compiled.teal")

    with open(contract_path, "r") as f:
        contract_code = f.read()

    compiled_code = compileTeal(contract_code, mode=Mode.Application)

    with open(compiled_path, "w") as f:
        f.write(compiled_code)


if __name__ == "__main__":
    contracts = ["Colateral", "JuntaPrincipal", "SeleccionAleatoria"]
    for contract in contracts:
        compile_contract(contract)
